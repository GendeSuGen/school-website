"use client";

import { ui } from "../lib/strings";

export function PrintButton() {
  return (
    <button type="button" className="btn" onClick={() => window.print()}>
      {ui.requirements.print}
    </button>
  );
}
