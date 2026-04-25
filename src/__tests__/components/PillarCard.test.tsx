import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ALL_PILLARS } from "@/lib/data";
import { PILLAR_GROUP_LABELS } from "@/lib/types";
import { PillarCard } from "@/components/pillars/PillarCard";

describe("PillarCard", () => {
  it("renders pillar identity, group, actor count, and detail link", () => {
    const pillar = ALL_PILLARS[0];

    expect(pillar).toBeDefined();
    render(<PillarCard pillar={pillar!} />);

    expect(
      screen.getByRole("link", { name: new RegExp(pillar!.name, "i") }),
    ).toHaveAttribute("href", `/pillars/${pillar!.slug}`);
    expect(screen.getByText(`Pillar ${pillar!.id}`)).toBeInTheDocument();
    expect(screen.getByText(pillar!.capacity)).toBeInTheDocument();
    expect(screen.getByText(PILLAR_GROUP_LABELS[pillar!.group])).toBeInTheDocument();
    expect(screen.getByText(/\d+ actors/)).toBeInTheDocument();
  });
});
