import dotenv from "dotenv";
dotenv.config();

import { sql } from "drizzle-orm"
import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users",{
    id: serial("id").primaryKey().notNull(),
    Fname : varchar("Fname",{length:100}).notNull(),
    Lname : varchar("Lname",{length:100}).notNull(),
    email : varchar("email",{length:100}).notNull().unique(),
    provider:varchar("provider",{length:20}),
    externalId:varchar("externalId",{length:100}),
    image:text("image"),
    role:varchar("role",{length:12}).notNull().default("customer"),
    createdAt:timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt:timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)
})

export const products = pgTable("products",{
    id: serial("id").primaryKey().notNull(),
    name : varchar("name",{length:100}).notNull(),
    description : varchar("description",{length:100}).notNull(),
    price : varchar("price",{length:100}).notNull(),
    image:text("image"),
    createdAt:timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt:timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)
})

export const warehouses = pgTable("warehouses",{
    id : serial("id",).primaryKey().notNull(),
    name: varchar("name",{length:100}).notNull(),
    pincode : varchar("pincode",{length:6}).notNull(),
    createdAt:timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt:timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)
},(table)=>[
    index('Pincode').on(table.id)
])

export const deliveryPersons = pgTable("deliveryPersons",{
    name:varchar("name",{length:100}).notNull(),
    pincode:varchar("pincode",{length:6}).notNull(),
    phone:varchar("phone",{length:10}).notNull(),
    warehouseId:integer("warehouse_id").references(() => warehouses.id,{onDelete:"cascade"}),
    productId: integer("product_id").references(()=> products.id,{onDelete:"set null"}),
    createdAt:timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt:timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    orderId: integer("order_id").references(()=>orders.id,{onDelete:'set null'}),
    id:serial('id').primaryKey().notNull()
})

export const orders = pgTable("orders",{
    id: serial("id").primaryKey().notNull(),
    user_id: serial('user_id').references(()=>users.id,{onDelete:'cascade'}).notNull(),
    product_id: serial('product_id').references(()=>products.id,{onDelete:'no action'}).notNull(),
    status:varchar('status',{length:10}).default('pending').notNull(),
    type:varchar('type',{length:6}).default('quick').notNull(),
    price:integer('price').notNull(),
    address:text('address').notNull(),
    qty:integer('qty').notNull(),
    createdAt:timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt:timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)
})


export const inventories = pgTable("inventories",{
    id: serial("id").primaryKey().notNull(),
    SKU:varchar("SKU",{length:8}).unique().notNull(),
    warehouseID:integer("warehouse_id").notNull().references(()=> warehouses.id,{onDelete:"cascade"}),
    productId : integer("product_id").notNull().references(()=>products.id,{onDelete:"cascade"}),
    orderId:integer("order_id").references(()=>orders.id,{onDelete:"set null"}),
    createdAt:timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt:timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)


})








