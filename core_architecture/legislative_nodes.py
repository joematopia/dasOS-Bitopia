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
