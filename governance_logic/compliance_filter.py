import hashlib
import math

class BitopiaComplianceFilter:
    def __init__(self):
        self.jurisdiction = "dasOS-Bitopia"
        self.protocol = "American Dream Protocol"
        self.digital_rights = [
            "Absolute_Self_Custody",
            "Quadratic_Representation",
            "Immutable_Speech",
            "Data_Sovereignty",
            "Digital_Exit"
        ]

    def _check_self_custody(self, payload: dict) -> bool:
        """Ensures the proposal does not attempt to freeze or confiscate private keys."""
        forbidden_flags = ["freeze_funds", "confiscate_wallet", "override_keys"]
        return not any(flag in payload.get('execution_logic', []) for flag in forbidden_flags)

    def _check_quadratic_voting(self, payload: dict) -> bool:
        """Enforces Article II: Voting power must be the square root of staked $GOV."""
        voting_mechanism = payload.get('voting_mechanism', 'linear')
        return voting_mechanism == 'quadratic'

    def _check_digital_exit(self, payload: dict) -> bool:
        """Enforces Article V: No exit taxes or data lock-in mechanisms."""
        exit_fee = payload.get('exit_tax', 0)
        return exit_fee == 0

    def evaluate_proposal(self, proposal_id: str, payload: dict) -> dict:
        """
        The Supreme Court Algorithm: Evaluates any proposed state-change 
        against the Bitopian Bill of Digital Rights.
        """
        print(f"⚖️ Evaluating Proposal [{proposal_id}] against the {self.protocol}...")
        
        checks = {
            "Self-Custody Intact": self._check_self_custody(payload),
            "Quadratic Representation Enforced": self._check_quadratic_voting(payload),
            "Digital Exit Untaxed": self._check_digital_exit(payload)
        }

        # If any check fails (returns False), the proposal is unconstitutional
        is_constitutional = all(checks.values())

        if is_constitutional:
            return {
                "status": "APPROVED",
                "hash": hashlib.sha256(str(payload).encode()).hexdigest(),
                "message": "Proposal adheres to the Bill of Digital Rights."
            }
        else:
            failed_rights = [key for key, passed in checks.items() if not passed]
            return {
                "status": "REJECTED",
                "message": f"Unconstitutional. Violation of: {', '.join(failed_rights)}"
            }

# --- Node Execution Example ---
if __name__ == "__main__":
    filter_node = BitopiaComplianceFilter()
    
    # A malicious proposal attempting to tax Citizens who leave the Network State
    malicious_proposal = {
        "title": "Network Retention Act",
        "execution_logic": ["apply_fee"],
        "exit_tax": 5.0, # Violates Digital Exit
        "voting_mechanism": "linear" # Violates Quadratic Representation
    }
    
    verdict = filter_node.evaluate_proposal("PROP-001", malicious_proposal)
    print(verdict)
