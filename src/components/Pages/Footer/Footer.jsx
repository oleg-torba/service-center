import footerCss from './Footer.module.css';
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={footerCss.footer}>
      <div className={footerCss.api}>
        <p className={footerCss.apiLink}>Розробка сайту – Торба О.</p>
      </div>
      <p className={footerCss.apiLink}>{currentYear}</p>
    </footer>
  );
}
