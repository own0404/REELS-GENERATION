from fastapi import APIRouter, Request
from schemas import ProductSchema
from deps import limiter

router = APIRouter(prefix="/api", tags=["products"])

PRODUCTS = [
    ProductSchema(id="WS-1", name="Water Softeners", category="Residential", icon="Droplets",
                  description="Removes hard water minerals (calcium & magnesium) through electromagnetic technology, preventing scale buildup in pipes and appliances while extending their lifespan."),
    ProductSchema(id="AW-1", name="Alkaline Water Ionizer", category="Residential", icon="BatteryCharging",
                  description="Electrically ionizes tap water to increase pH and create antioxidant-rich alkaline water."),
    ProductSchema(id="RO-1", name="RO Water Plants", category="Apartment", icon="Filter",
                  description="Multi-stage reverse osmosis system removing up to 99% of dissolved salts and contaminants."),
    ProductSchema(id="SF-1", name="Sand Filters", category="Apartment", icon="Layers",
                  description="Graded sand media filtration for suspended solids and sediment removal."),
    ProductSchema(id="NB-1", name="Nano Bubble Oxygen Generator", category="Commercial", icon="CircleDot",
                  description="Ultrafine oxygen nanobubbles for boosted dissolved oxygen in aquaculture and water treatment."),
    ProductSchema(id="ST-1", name="STP (Sewage Treatment Plant)", category="Commercial", icon="Recycle",
                  description="Multi-stage biological and physical wastewater treatment for non-potable reuse."),
    ProductSchema(id="ET-1", name="ETP (Effluent Treatment Plant)", category="Commercial", icon="FlaskConical",
                  description="Industrial wastewater treatment with chemical and biological processes."),
    ProductSchema(id="RA-1", name="RAS (Recirculating Aquaculture System)", category="Commercial", icon="Waves",
                  description="Water recirculation system for high-density fish farming with 90%+ water savings."),
]


@router.get("/products", response_model=list[ProductSchema])
@limiter.limit("30/minute")
def get_products(request: Request, category: str | None = None):
    if category:
        return [p for p in PRODUCTS if p.category == category]
    return PRODUCTS
