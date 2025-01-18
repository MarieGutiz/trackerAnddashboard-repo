import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { issueSchema } from "../../validationSchema";


export async function POST(request: NextRequest) {
    const issues = await request.json();
    const parsedIssues = issueSchema.safeParse(issues);

    if(!parsedIssues.success || !parsedIssues.data) {
        return NextResponse.json(parsedIssues.error.format(), { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: {title: parsedIssues.data.title, description: parsedIssues.data.description} ,
    });

    return NextResponse.json(newIssue, { status: 201 });
}