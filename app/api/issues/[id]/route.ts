import { issueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }  
) {
    const body = await request.json();
    const validationObj = issueSchema.safeParse(body);

    if (!validationObj.success) {
        return NextResponse.json(
            validationObj.error.format(),
            { status: 400 }
        );
    }
    
    const { id } = await params
            const issueId = parseInt(id)
        
            if (isNaN(issueId)) {
                notFound()
            }

    const issue = await prisma.issue.findUnique({
        where: { id: issueId
        }
    });
    if (!issue) {
        return NextResponse.json(
            { error: "Issue not found" },
            { status: 404 }
        );
    }

   const updatedIssue = await prisma.issue.update({
        where: { id: issueId }, 
        data: {
            title: body.title,
            description: body.description,
            status: body.status
        }
    });
    return NextResponse.json(updatedIssue, {
        status: 200
    });
}