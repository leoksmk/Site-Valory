"use client";

import Image from "next/image";
import { useLang } from "./lang-context";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Image src="/logo.webp" alt="Valory" width={30} height={30} />
        <span>VALORY</span>
      </div>
      <p className="footer__tag">{t("footer_tag")}</p>
      <p className="footer__copy">
        © {new Date().getFullYear()} Valory. {t("footer_rights")}
      </p>
    </footer>
  );
}
