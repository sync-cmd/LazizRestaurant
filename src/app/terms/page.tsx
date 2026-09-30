import React from 'react'
import { LuNewspaper } from 'react-icons/lu'

const page = () => {
    return (
        <div className="min-h-screen bg-[#fffaf5] px-4 py-10 text-[#4a2d1c] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl rounded-3xl border border-[#f3c58f] bg-white/90 p-6 shadow-[0_12px_35px_rgba(122,46,14,0.08)] sm:p-8 lg:p-10">
                <h1 className="flex items-center gap-3 text-2xl font-bold leading-tight text-[#7a3d16] underline sm:text-3xl xl:text-4xl">
                    <span className="rounded-full bg-[#fff0e6] p-3 text-2xl">
                        <LuNewspaper />
                    </span>
                    Terms and Conditions
                </h1>

                <h3 className='mt-6 text-xl font-bold'>
                    Last Updated: August 1, 2026.
                </h3>

                <p className="mt-6 text-sm leading-7 text-[#6b4a32] sm:text-base">
                    Welcome to <span className='font-bold'>LAZIZ Reataurant</span>. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our services.
                </p>

                <div className="mt-8 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">1. Use of Our Website</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            You agree to use our website only for lawful purposes. <br /> You must not:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>Provide false or misleading information.</li>
                            <li>Attempt to gain unauthorized access to our systems.</li>
                            <li>Interfere with the operation or security of the website.</li>
                            <li>Use the website for fraudulent or illegal activities.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">2. Account Registration</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            To access certain features, you may be required to create an account <br />
                            You are responsible for:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>Keeping your login credentials secure.</li>
                            <li>Maintaining the confidentiality of your account.</li>
                            <li>All activities performed under your account.</li>
                        </ul>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">Notify us immediately if you believe your account has been compromised.</p>

                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">3. Orders</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            By placing an order, you confirm that:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>The information you provide is accurate.</li>
                            <li>You are authorized to use the selected payment method.</li>
                            <li>You agree to pay the total amount displayed during checkout.</li>
                        </ul>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">All orders are subject to acceptance and product availability.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">4. Pricing</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            We strive to ensure all prices are accurate. <br />However, we reserve the right to:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>Correct pricing errors.</li>
                            <li>Modify prices without prior notice.</li>
                            <li>Cancel orders affected by pricing inaccuracies.</li>
                        </ul>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">If payment has already been processed, an appropriate refund will be issued when applicable.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">5. Payments</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            Payments are processed through secure third-party payment providers. <br />We do not store your complete payment card information.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">7. Cancellations and Refunds</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            Orders may only be cancelled before food preparation begins.<br />Refunds may be granted when:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>An order cannot be fulfilled.</li>
                            <li>Incorrect items are delivered.</li>
                            <li>Food arrives damaged or unsafe.</li>
                        </ul>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">Refund requests are reviewed individually.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">8. Allergies and Dietary Information</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            We provide ingredient information where possible.<br />However:
                        </p>
                        <ul className="list-disc list-inside">
                            <li>Cross-contamination may occur during food preparation.</li>
                            <li>Customers with allergies should contact us before placing an order.</li>
                        </ul>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">We cannot guarantee any menu item is completely free from allergens.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">9. Intellectual Property</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            All content on this website, including:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>Logos</li>
                            <li>Images</li>
                            <li>Menu descriptions</li>
                            <li>Graphics</li>
                            <li>Design</li>
                            <li>Software</li>
                        </ul>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">belongs to <span className='font-bold'>LAZIZ Reataurant</span> and may not be copied, reproduced, or distributed without written permission.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">10. Limitation of Liability</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            To the fullest extent permitted by law, we are not liable for:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>Indirect or consequential damages.</li>
                            <li>Loss of profits or business opportunities.</li>
                            <li>Service interruptions caused by events beyond our control.</li>
                        </ul>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">Our total liability shall not exceed the amount paid for the relevant order.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">11. Privacy</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            Your use of our website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">12. Third-Party Services</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                        </p>
                        Our website may use third-party services for:
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>Authentication</li>
                            <li>Payment processing</li>
                            <li>Maps</li>
                            <li>Analytics</li>
                        </ul>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">These services have their own terms and privacy policies.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">13. Changes to These Terms</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>We may update these Terms and Conditions at any time.</li>
                            <li>Changes become effective immediately upon publication on this page.</li>
                            <li>Continued use of the website constitutes acceptance of the updated terms.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#7a3d16]">14. Contact Us</h2>
                        <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            If you have questions regarding these Terms and Conditions, please contact us:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
                            <li>Email: <span className=' underline'> 1998aadityaraj2007@gmail.com </span></li>
                            <li>Phone: <span className=' underline'> +91-8235112934 </span></li>
                            <li>Address: 28A, Patliputra Colony Road,behind Atal Park, Patna,Bihar - 800013.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page