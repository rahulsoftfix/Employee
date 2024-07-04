import Link from 'next/link';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="copyright">
                    <p>Copyright © <Link href="#">QuickBid</Link> {new Date().getFullYear()}</p>
                </div>
            </div>
        </>
    );
};

export default Footer;