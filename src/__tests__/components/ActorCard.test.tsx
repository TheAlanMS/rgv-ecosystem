import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ALL_ACTORS } from "@/lib/data";
import { ActorCard } from "@/components/actors/ActorCard";

describe("ActorCard", () => {
  it("renders an active actor with location, status, and profile link", () => {
    const actor = ALL_ACTORS.find((item) => item.status === "Active");

    expect(actor).toBeDefined();
    render(<ActorCard actor={actor!} />);

    expect(screen.getByRole("link", { name: /active/i })).toHaveAttribute(
      "href",
      `/actors/${actor!.slug}`,
    );
    expect(screen.getByText(actor!.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(actor!.city))).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders gap actors as non-link gap cards", () => {
    const gapActor = ALL_ACTORS.find((item) => item.status === "Gap");

    expect(gapActor).toBeDefined();
    render(<ActorCard actor={gapActor!} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Gap")).toBeInTheDocument();
    expect(screen.getByText(gapActor!.name)).toBeInTheDocument();
  });
});
