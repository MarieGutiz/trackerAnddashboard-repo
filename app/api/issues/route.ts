import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/prisma/client";


// Define the shape of the issue object
const issueSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3),
    // status: z.enum(["open", "closed", "in-progress"]),
});

export async function POST(request: NextRequest) {
    const issues = await request.json();
    const parsedIssues = issueSchema.safeParse(issues);

    if(!parsedIssues.success || !parsedIssues.data) {
        return NextResponse.json({ error: "Invalid issue data when creating an issue" }, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: {title: parsedIssues.data.title, description: parsedIssues.data.description} ,
    });

    return NextResponse.json(newIssue, { status: 201 });
}