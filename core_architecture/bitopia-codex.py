# Bitopia Codex: The Ultimate Check and Balance
# Akin to the U.S. Constitution, but enforced via code.

class BitopiaCodex:
    def __init__(self):
        # Immutable Principles (In a real DAO, these would be hardcoded in a Smart Contract)
        self.fundamental_rights = ["Right to Energy", "Right to Privacy", "Right to Governance"]
        self.maximum_tax_rate = 0.15 # 15% Cap

    def validate_action(self, action_type, proposed_parameters):
        """
        Checks if a proposed action by any branch violates the Codex.
        """
        # Example Check: Executive branch cannot set tax above 15%
        if action_type == "Set Tax" and proposed_parameters.get("rate") > self.maximum_tax_rate:
            return False, "ERROR: Unconstitutional Tax Rate."
            
        # Example Check: Any branch trying to remove a fundamental right
        if action_type == "Amend Rights" and proposed_parameters.get("target") in self.fundamental_rights:
            return False, "ERROR: Fundamental Rights are Immutable."

        return True, "ACTION: Constitutional."

# Simulation
codex = BitopiaCodex()
status, message = codex.validate_action("Set Tax", {"rate": 0.20})
print(message) # Result: ERROR: Unconstitutional Tax Rate.O
