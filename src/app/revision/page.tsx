import type { Metadata } from "next";
import { RevisionApp } from "@/components/revision/revision-app";

export const metadata: Metadata = {
  title: "Revision — Mission 80/80 | Saathy",
  description: "Final revision planner: concepts, IMP questions, MCQ drills and the exam-morning power page.",
};

export default function RevisionPage() {
  return <RevisionApp />;
}
