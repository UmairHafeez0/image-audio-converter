import React from 'react';
import Link from 'next/link';
import './Pricing.module.css';

export default function Pricing() {
  return (
    <>
      <header>
        <div className="container text-center text-white py-5">
          <h1 className="display-3">Pricing Plans</h1>
          <p className="lead">Affordable pricing for all our powerful tools and services. Choose the plan that best fits your needs.</p>
        </div>
      </header>

      <section id="pricing" className="py-5">
        <div className="container">
          <h2 className="display-5 text-center">Our Pricing Plans</h2>
          <div className="row mt-4">
            {/* Media Conversion Tools Pricing */}
            <div className="col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Media Conversion Tools</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tool</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Image Format Converter</td>
                        <td>$0.5 per conversion</td>
                      </tr>
                      <tr>
                        <td>Video Format Converter</td>
                        <td>$1 per conversion</td>
                      </tr>
                      <tr>
                        <td>Audio Format Converter</td>
                        <td>$1 per conversion</td>
                      </tr>
                      <tr>
                        <td>File Format Converter</td>
                        <td>$1 per conversion</td>
                      </tr>
                      <tr>
                        <td>PDF to DOCX Converter</td>
                        <td>$1.5 per conversion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Media Downloading Tools Pricing */}
            <div className="col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Media Downloading Tools</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tool</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>YouTube Video Downloader</td>
                        <td>$0.5 per download</td>
                      </tr>
                      <tr>
                        <td>Facebook Video Downloader</td>
                        <td>$0.5 per download</td>
                      </tr>
                      <tr>
                        <td>TikTok Video Downloader</td>
                        <td>$0.5 per download</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Compression and Editing Tools Pricing */}
            <div className="col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Compression and Editing Tools</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tool</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Image Compression</td>
                        <td>$0.25 per image</td>
                      </tr>
                      <tr>
                        <td>Video Compression</td>
                        <td>$0.5 per video</td>
                      </tr>
                      <tr>
                        <td>PDF Compression</td>
                        <td>$0.5 per PDF</td>
                      </tr>
                      <tr>
                        <td>GIF Creation</td>
                        <td>$0.5 per GIF</td>
                      </tr>
                      <tr>
                        <td>Audio Cutter</td>
                        <td>$0.5 per audio file</td>
                      </tr>
                      <tr>
                        <td>Video Cutter</td>
                        <td>$1 per video</td>
                      </tr>
                      <tr>
                        <td>PDF Merge</td>
                        <td>$1 per merge</td>
                      </tr>
                      <tr>
                        <td>PDF Split</td>
                        <td>$1 per split</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Document Tools Pricing */}
            <div className="col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Document Tools</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tool</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Word to PDF</td>
                        <td>$1 per conversion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Utility Tools Pricing */}
            <div className="col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Utility Tools</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tool</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Text to Speech</td>
                        <td>$0.5 per conversion</td>
                      </tr>
                      <tr>
                        <td>Speech to Text</td>
                        <td>$0.5 per conversion</td>
                      </tr>
                      <tr>
                        <td>QR Code Generator</td>
                        <td>$0.25 per QR code</td>
                      </tr>
                      <tr>
                        <td>Barcode Generator</td>
                        <td>$0.25 per barcode</td>
                      </tr>
                      <tr>
                        <td>URL Shortener</td>
                        <td>$0.1 per URL</td>
                      </tr>
                      <tr>
                        <td>Unit Conversion</td>
                        <td>$0.25 per conversion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Options */}
          <div className="mt-5 text-center">
            <h2 className="display-6">How to Purchase</h2>
            <p>If you have a larger project or need custom solutions, please <a href="mailto:social@dailycoinmarket.com" className="btn btn-primary">Contact Us</a>.</p>
            <p>For smaller projects or direct purchases, visit our <Link href="/request-page" className="btn btn-secondary">Request Page</Link>.</p>
          </div>

          {/* FAQ Section */}
          <div className="mt-5">
            <h2 className="display-6 text-center">Frequently Asked Questions</h2>
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="faqHeadingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseOne" aria-expanded="true" aria-controls="faqCollapseOne">
                    What payment methods do you accept?
                  </button>
                </h2>
                <div id="faqCollapseOne" className="accordion-collapse collapse show" aria-labelledby="faqHeadingOne" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    We accept various payment methods including credit/debit cards and PayPal.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="faqHeadingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseTwo" aria-expanded="false" aria-controls="faqCollapseTwo">
                    Are there any discounts for bulk purchases?
                  </button>
                </h2>
                <div id="faqCollapseTwo" className="accordion-collapse collapse" aria-labelledby="faqHeadingTwo" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Yes, we offer discounts for bulk purchases. Please contact us for more details.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="faqHeadingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseThree" aria-expanded="false" aria-controls="faqCollapseThree">
                    How can I cancel my subscription?
                  </button>
                </h2>
                <div id="faqCollapseThree" className="accordion-collapse collapse" aria-labelledby="faqHeadingThree" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    To cancel your subscription, please contact our support team through the <a href="mailto:social@dailycoinmarket.com">contact email</a>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
