import "./Footer.css";
import whatsappIcon from "../../assets/whatsapp.svg"
import githubIcon from "../../assets/github.svg"
import instragramIcon from "../../assets/instagram.svg"

export const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <h3>NEXUS GEAR</h3>
          <p>
            Ingeniería de alto rendimiento para esports y hardware para
            entusiastas. Precisión implacable, cero latencia y estética
            pro-gamer diseñada para dominar.
          </p>
        </div>

        <div className="footer-column">
          <h4>Hardware Pro</h4>
          <ul>
            <li>Mouses Ultraligeros</li>
            <li>Teclados Mecánicos Ópticos</li>
            <li>Auriculares Espaciales 7.1</li>
            <li>Sillas Ergonómicas Apex</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Soporte & Garantía</h4>
          <ul>
            <li>Centro de Asistencia</li>
            <li>Software & Drivers</li>
            <li>Garantía Pro-Tier</li>
            <li>Estado del Envío</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Transacciones Blindadas</h4>
          <p>
            Pagos cifrados de extremo a extremo mediante protocolos de seguridad
            de alta velocidad.
          </p>
          <div className="payment-badges">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>PAYPAL</span>
            <span>CRYPTO</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Nexus Gear. Todos los derechos reservados.</p>
        <nav className="social-links">
          <a href="https://wa.me/5492215959818" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img className="social-icon" src={whatsappIcon} alt="WhatsApp" />
          </a>

          <a href="https://github.com/LazaroLironis241103" target="_blank"  rel="noopener noreferrer" aria-label="GitHub">
            <img className="social-icon" src={githubIcon} alt="GitHub" />
          </a>

          <a href="https://instagram.com/lalo_lironis" target="_blank"  rel="noopener noreferrer" aria-label="Instagram">
            <img className="social-icon" src={instragramIcon} alt="Instagram" />
          </a>
        </nav>
      </div>
    </footer>
  );
};
