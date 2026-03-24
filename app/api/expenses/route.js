import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

export async function GET() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const dbId = process.env.NOTION_DATABASE_ID;

  try {
    let allResults = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: dbId,
        start_cursor: startCursor,
        sorts: [{ property: "Date", direction: "descending" }],
      });

      allResults = allResults.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    const expenses = allResults.map((page) => {
      const props = page.properties;

      const name =
        props.Name?.title?.[0]?.plain_text || "Unknown";
      const date =
        props.Date?.date?.start || null;
      const amount =
        props.Amount?.number || 0;
      const vendor =
        props.Vendor?.rich_text?.[0]?.plain_text || "";
      const source =
        props.Source?.rich_text?.[0]?.plain_text || "";
      const rawSubject =
        props["Raw Email Subject"]?.rich_text?.[0]?.plain_text || "";

      // Category can be a select or a relation — handle both
      let category = "Uncategorized";
      if (props.Category?.select?.name) {
        category = props.Category.select.name;
      } else if (props.Category?.rich_text?.[0]?.plain_text) {
        category = props.Category.rich_text[0].plain_text;
      }

      return { name, date, amount, vendor, category, source, rawSubject };
    });

    return NextResponse.json({
      expenses,
      count: expenses.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses from Notion", details: error.message },
      { status: 500 }
    );
  }
}
