"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { PATH } from "../../../constants";

export default function CloseButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const close = () => {
    const location =
      PATH.ROOT + (searchParams?.size ? "?" + searchParams.toString() : "");
    router.push(location);
  };

  const clickHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      target.closest(".character-card") ||
      target.closest(".nav-list__item") ||
      target.closest(".search__input") ||
      target.closest(".search__button") ||
      target.closest(".pagination__button")
    )
      return;
    close();
  };

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  return (
    <button className="character-card__close" onClick={close}>
      ×
    </button>
  );
}
