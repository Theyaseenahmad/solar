CREATE TABLE "deliveryPersons" (
	"name" varchar(100) NOT NULL,
	"pincode" varchar(6) NOT NULL,
	"warehouse_id" integer,
	"product_id" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE "deliveryPersons" ADD CONSTRAINT "deliveryPersons_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deliveryPersons" ADD CONSTRAINT "deliveryPersons_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;