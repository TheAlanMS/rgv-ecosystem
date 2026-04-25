import { Shell } from "./Shell";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-default py-8 mt-auto">
      <Shell>
        <div className="text-center">
          <p className="text-text-muted text-xs">
            <span className="text-gold font-heading font-medium">
              Frontera Leadership Institute
            </span>{" "}
            — Building the ecosystem Brownsville and the Rio Grande Valley
            deserve.
          </p>
          <p className="text-text-muted/50 text-[10px] mt-2 tracking-wide uppercase">
            LMNTS / FLI &middot; Brownsville, Texas &middot; CC BY-SA 4.0
          </p>
        </div>
      </Shell>
    </footer>
  );
}
