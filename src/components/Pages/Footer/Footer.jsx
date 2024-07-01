import footerCss from './Footer.module.css';
export function Footer() {
  return (
    <footer className={footerCss.footer}>
      <div className={footerCss.api}>
        <p className={footerCss.apiLink}>Розробка сайту – Торба О.</p>
      </div>
      <p className={footerCss.apiLink}>2024</p>
    </footer>
  );
}
