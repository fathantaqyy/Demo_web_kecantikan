import type { Product } from "@/lib/data";

export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  return <div className={`product-visual ${large ? "large" : ""}`} style={{ "--accent": product.accent } as React.CSSProperties}>
    <span className="orb one"/><span className="orb two"/>
    <div className={`packaging ${product.form}`}>
      {product.form === "dropper" && <><span className="pipette"/><span className="cap"/></>}
      {product.form === "pump" && <><span className="pump-stem"/><span className="pump-top"/></>}
      {product.form === "jar" && <span className="jar-lid"/>}
      <div className="product-label"><b>2b</b><span>SHINE</span><small>{product.category}</small></div>
    </div>
    <span className="surface-shadow"/>
  </div>;
}
