import './Footer.module.scss';

interface FooterProps {
  className: string;
}

export default function Footer(props: FooterProps) {
  return (
    <div className={props.className}>
      <div className="footer__wrapper">
        <div className="footer__item">
          <a
            href="https://github.com/myspecialspace"
            target="_blank"
            className="github-link"
            rel="noreferrer"
          >
            {' '}
          </a>
        </div>
        <div className="footer__item">&copy;2023</div>
        <div className="footer__item">
          <a href="https://rs.school/react/" target="_blank" className="RS-link" rel="noreferrer">
            {' '}
          </a>
        </div>
      </div>
    </div>
  );
}
