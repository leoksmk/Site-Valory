"use client";

import Image from "next/image";
import { useLang } from "./lang-context";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Image src="/logo-full-t.png" alt="Valory" width={107} height={48} priority={false} />
      </div>
      <p className="footer__tag">{t("footer_tag")}</p>
      <p className="footer__copy">
        © {new Date().getFullYear()} Valory. {t("footer_rights")}
      </p>
    </footer>
  );
}
