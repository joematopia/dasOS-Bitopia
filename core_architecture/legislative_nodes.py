import math

class LegislativeNodes:
    def __init__(self, codex):
        self.codex = codex
        self.proposals = []

    def calculate_qv_cost(self, desired_votes):
        """
        Implements Quadratic Voting: Cost = Votes^2.
        This ensures high-intensity preferences have a higher marginal cost.
        """
        return desired_votes ** 2

    def cast_qv_vote(self, citizen_gov_balance, desired_votes):
        cost = self.calculate_qv_cost(desired_votes)
        if citizen_gov_balance >= cost:
            return True, f"SUCCESS: {desired_votes} votes cast. Cost: {cost} $GOV."
        return False, f"REJECTED: Insufficient $GOV. Required: {cost}, Available: {citizen_gov_balance}."

    def submit_proposal(self, title, details):
        is_legal, msg = self.codex.validate_action("New Law", {"title": title})
        if is_legal:
            self.proposals.append({"title": title, "status": "Pending"})
            return f"Proposal '{title}' submitted."
        return msg

class LegislativeNodes:
    def __init__(self, codex):
        self.codex = codex
        self.proposals = []

    def submit_proposal(self, title, details):
        # Every law must be checked against the Codex
        is_legal, msg = self.codex.validate_action("New Law", {"title": title})
        if is_legal:
            self.proposals.append({"title": title, "status": "Pending"})
            return f"Proposal '{title}' submitted for voting."
        return msg
