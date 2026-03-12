class AIDirectorate:
    def __init__(self, codex):
        self.codex = codex

    def execute_resource_allocation(self, energy_amount):
        # AI must follow the Codex tax and resource limits
        is_legal, msg = self.codex.validate_action("Set Tax", {"rate": 0.05})
        if is_legal:
            return f"AI Directorate allocated {energy_amount} E-Watts efficiently."
        return msg
