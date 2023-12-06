import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//edit the ingredients of a menu item
/**
 * Edit the Ingredients of a menu item
 *
 * @param request contains data needed for SQL query: drink, list of ingredients
 * @returns a message indicating whether the query was successful or not
 */
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {drink,ing} = data;

        //check if valid
        const dupeQuery = "SELECT * FROM products WHERE drink_name = $1;";
        const dupe = await query(dupeQuery,[drink]);
        if(dupe.rows.length == 0){
            return NextResponse.json({error:"Item does not exist on Menu!"},{status: 500});
        }


        const sql = "UPDATE products SET ingredients = $1 WHERE drink_name = $2";
        const result = await query(sql,[ing,drink]);

        return NextResponse.json({ message: "Type of "+drink+" changed successfully" }, { status: 200 });
    }
    catch(error:any){
       console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}