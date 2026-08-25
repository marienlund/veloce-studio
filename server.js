const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const JSZip = require('jszip');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Stripe if valid key is set
let stripe = null;
if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('mock')) {
  try {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    console.log('⚡ Stripe API Initialized in Production Mode!');
  } catch (err) {
    console.log('⚠️ Stripe init note:', err.message);
  }
} else {
  console.log('ℹ️ Stripe is in Demo/Simulation Mode. (Mock keys active in .env)');
}

// Configure Nodemailer SMTP Transporter
let mailTransporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  try {
    mailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('✉️ SMTP Mailer Initialized for Host:', process.env.SMTP_HOST);
  } catch (err) {
    console.log('⚠️ SMTP init note:', err.message);
  }
} else {
  console.log('ℹ️ SMTP settings omitted in .env. Order emails will be logged to console in dev mode.');
}

// In-memory Order Stores
const pendingOrders = new Map();
const completedOrders = new Map();

// Helper: Build ZIP Buffer from Pages Object or HTML String
async function createWebsiteZipBuffer(pages, brandName) {
  const zip = new JSZip();
  if (pages && typeof pages === 'object' && Object.keys(pages).length > 0) {
    Object.keys(pages).forEach(filename => {
      zip.file(filename, pages[filename]);
    });
  } else if (typeof pages === 'string') {
    zip.file('index.html', pages);
  } else {
    zip.file('index.html', `<!DOCTYPE html><html><head><title>${brandName || 'Hjemmeside'}</title></head><body><h1>${brandName || 'Veloce Studio Hjemmeside'}</h1></body></html>`);
  }
  zip.file('README.txt', `Tak for dit køb hos Veloce Studio!\n\nDin multi-page hjemmeside for ${brandName || 'din virksomhed'} er 100% klar med alle undersider.\n\nUpload mappen direkte til Simply.com, One.com eller dit valgte webhotel.\n\nSupport & Kontaktoplysninger: kontakt@velocestudio.dk`);
  return await zip.generateAsync({ type: 'nodebuffer' });
}

// Helper: Send Order Confirmation Email with ZIP Attachment
async function sendOrderEmail({ to, brandName, receiptId, zipBuffer }) {
  if (!to) {
    console.log('⚠️ Cannot send order email: No recipient email provided.');
    return { sent: false, error: 'No recipient email' };
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || 'Veloce Studio <kontakt@velocestudio.dk>',
    to: to,
    subject: `⚡ Din Hjemmeside er klar! (Kvittering #${receiptId}) — ${brandName || 'Veloce Studio'}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; padding: 32px; border: 1px solid #1e293b;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #7c3aed; margin: 0; font-size: 28px;">Veloce Studio</h1>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Tillykke med din nye professionelle hjemmeside!</p>
        </div>
        <div style="background: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h3 style="margin-top:0; color:#38bdf8;">Ordredetaljer</h3>
          <p style="margin:6px 0;"><strong>Branchenavn:</strong> ${brandName || 'Min Hjemmeside'}</p>
          <p style="margin:6px 0;"><strong>Kvitteringsnr:</strong> #${receiptId}</p>
          <p style="margin:6px 0;"><strong>Pakke:</strong> Veloce Multi-Page Hjemmeside (5 Undersider HTML/CSS)</p>
          <p style="margin:6px 0;"><strong>Status:</strong> <span style="color:#4ade80;">Betalt & Leveret</span></p>
        </div>
        <p style="color: #cbd5e1; line-height: 1.6;">
          Vedhæftet finder du din komplette <strong>.ZIP-fil</strong> med alle 5 produktionsklare undersider (Forside, Om Os, Ydelser, Priser, Kontakt) samt README installationsvejledning.
        </p>
        <p style="color: #cbd5e1; line-height: 1.6;">
          Du kan uploade filerne direkte til Simply.com, One.com, Netlify, Vercel eller dit foretrukne webhotel.
        </p>
        <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #334155; color: #64748b; font-size: 12px;">
          &copy; ${new Date().getFullYear()} Veloce Studio. Alle rettigheder forbeholdes.
        </div>
      </div>
    `,
    attachments: zipBuffer ? [
      {
        filename: `${(brandName || 'hjemmeside').toLowerCase().replace(/\s+/g, '-')}-veloce-package.zip`,
        content: zipBuffer
      }
    ] : []
  };

  if (mailTransporter) {
    try {
      const info = await mailTransporter.sendMail(mailOptions);
      console.log(`✉️ EMAIL DELIVERED successfully to ${to}. MessageId: ${info.messageId}`);
      return { sent: true, messageId: info.messageId };
    } catch (err) {
      console.error('❌ Failed to send order email via SMTP:', err.message);
      return { sent: false, error: err.message };
    }
  } else {
    console.log(`ℹ️ [DEV EMAIL SIMULATION] Order #${receiptId} dispatched for ${to} (${brandName}). ZIP size: ${zipBuffer ? zipBuffer.length : 0} bytes.`);
    return { sent: true, simulated: true };
  }
}

// Middleware
app.use(cors());

// Raw body parser for Stripe Webhooks
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
  } else {
    express.json({ limit: '50mb' })(req, res, next);
  }
});

// Serve static frontend files with no-cache headers for instant updates
app.use(express.static(path.join(__dirname), {
  etag: false,
  maxAge: 0,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// API: Get App & Stripe Status
app.get('/api/config', (req, res) => {
  res.json({
    stripeEnabled: !!stripe,
    smtpEnabled: !!mailTransporter,
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY || '',
    domain: process.env.DOMAIN_URL || `http://localhost:${PORT}`
  });
});

// API: Create Stripe Checkout Session (Cards & MobilePay) + Order Registration
app.post('/api/create-checkout-session', async (req, res) => {
  const { email, brandName, websitePages } = req.body;
  const receiptId = `VELOCE-${Math.floor(10000 + Math.random() * 90000)}`;

  // Store order details in pending orders map
  const orderData = {
    receiptId,
    email: email || 'kunde@veloce-studio.dk',
    brandName: brandName || 'Min Hjemmeside',
    websitePages: websitePages || null,
    createdAt: Date.now()
  };

  if (!stripe) {
    // Demo / Simulation Mode Response
    try {
      const zipBuffer = await createWebsiteZipBuffer(websitePages, brandName);
      await sendOrderEmail({
        to: orderData.email,
        brandName: orderData.brandName,
        receiptId: orderData.receiptId,
        zipBuffer
      });

      completedOrders.set(`demo_${receiptId}`, { ...orderData, isPaid: true });

      return res.json({
        demoMode: true,
        success: true,
        receiptId: orderData.receiptId,
        message: 'Demo mode active. Payment simulated and email notification dispatched!',
        sessionId: `demo_${receiptId}`
      });
    } catch (err) {
      console.error('Error handling demo payment:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  // Real Stripe Checkout Session Creation
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'mobilepay'],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'dkk',
            product_data: {
              name: `Veloce Studio — Hjemmeside Pakke (${brandName || 'Min Hjemmeside'})`,
              description: 'Komplet 5-siders kildekode (HTML, CSS), alle billeder & 100% responsivitet.',
              images: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80']
            },
            unit_amount: 29900, // 299.00 DKK
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.DOMAIN_URL || `http://localhost:${PORT}`}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN_URL || `http://localhost:${PORT}`}?payment_cancelled=true`,
      metadata: {
        receiptId: orderData.receiptId,
        brandName: orderData.brandName,
        customerEmail: orderData.email
      }
    });

    pendingOrders.set(session.id, orderData);

    res.json({ id: session.id, url: session.url, receiptId: orderData.receiptId });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: error.message });
  }
});

// API: Verify Completed Payment / Demo Session
app.get('/api/verify-payment', async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session_id parameter' });
  }

  if (sessionId.startsWith('demo_')) {
    const order = completedOrders.get(sessionId) || {
      receiptId: `VELOCE-${Math.floor(10000 + Math.random() * 90000)}`,
      brandName: 'Veloce Studio Webapp',
      email: 'kunde@veloce-studio.dk'
    };
    return res.json({ success: true, ...order, demoMode: true });
  }

  if (!stripe) {
    return res.json({ success: true, receiptId: 'VELOCE-DEMO', isPaid: true });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      const order = pendingOrders.get(sessionId) || {};
      const customerEmail = session.customer_email || session.metadata.customerEmail || order.email;
      const brandName = session.metadata.brandName || order.brandName || 'Min Hjemmeside';
      const receiptId = session.metadata.receiptId || order.receiptId || `VELOCE-${Math.floor(10000 + Math.random() * 90000)}`;

      if (!completedOrders.has(sessionId)) {
        const zipBuffer = await createWebsiteZipBuffer(order.websitePages, brandName);
        await sendOrderEmail({ to: customerEmail, brandName, receiptId, zipBuffer });
        completedOrders.set(sessionId, { receiptId, customerEmail, brandName, isPaid: true });
      }

      return res.json({ success: true, receiptId, brandName, customerEmail, isPaid: true });
    } else {
      return res.json({ success: false, status: session.payment_status });
    }
  } catch (err) {
    console.error('Error verifying payment session:', err);
    res.status(500).json({ error: err.message });
  }
});

// API: Stripe Webhook Listener
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  if (process.env.STRIPE_WEBHOOK_SECRET && stripe) {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    try {
      event = JSON.parse(req.body.toString());
    } catch (e) {
      event = req.body;
    }
  }

  // Handle successful payment event
  if (event && event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(`🎉 STRIPE PAYMENT SUCCESSFUL! Customer: ${session.customer_email}, Session ID: ${session.id}`);

    const order = pendingOrders.get(session.id) || {};
    const customerEmail = session.customer_email || session.metadata.customerEmail || order.email;
    const brandName = session.metadata.brandName || order.brandName || 'Min Hjemmeside';
    const receiptId = session.metadata.receiptId || order.receiptId || `VELOCE-${Math.floor(10000 + Math.random() * 90000)}`;

    if (!completedOrders.has(session.id)) {
      const zipBuffer = await createWebsiteZipBuffer(order.websitePages, brandName);
      await sendOrderEmail({ to: customerEmail, brandName, receiptId, zipBuffer });
      completedOrders.set(session.id, { receiptId, customerEmail, brandName, isPaid: true });
    }
  }

  res.json({ received: true });
});

// Fallback to index.html for single page app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Veloce Studio Server is running:`);
  console.log(`   👉 Local PC:   http://localhost:${PORT}`);
  console.log(`   👉 Mobile Phone: http://192.168.0.145:${PORT}`);
});
