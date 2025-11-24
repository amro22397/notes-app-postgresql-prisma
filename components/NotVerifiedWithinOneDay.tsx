"use client";

import { useLocale } from "next-intl";
import React from "react";

const NotVerifiedWithinOneDay = () => {
  const locale = useLocale();
  return (
    <span className="mx-1">
      {locale === "en" &&
        "If the user is not verified withing 1 day, it will be deleted."}

      {locale === "ar" && "إذا لم يتم تأكيد الحساب خلال يوم واحد سوف يتم حذفه."}
    </span>
  );
};

export default NotVerifiedWithinOneDay;
