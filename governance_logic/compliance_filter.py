# dasOS Compliance Filter - Fiduciary Logic Simulation
# Purpose: To ensure Bitopia governance proposals meet fiduciary standards.

def check_proposal_compliance(proposal_type, risk_score, citizen_reputation):
    """
    Simulates a fiduciary 'Suitability' check derived from Series 65 standards.
    """
    print(f"--- Analyzing Proposal: {proposal_type} ---")
    
    # Logic: High-risk financial proposals require high citizen reputation scores
    if proposal_type == "Treasury Investment" and risk_score > 7:
        if citizen_reputation < 85:
            return "REJECTED: Risk exceeds Citizen Reputation threshold (Fiduciary Guardrail)."
        else:
            return "PASSED: Proposal meets suitability requirements."
            
    elif proposal_type == "Infrastructure Update":
        return "PASSED: Non-financial proposal approved for voting."
        
    return "PENDING: Manual compliance review required."

# Simulation Run
test_proposal = check_proposal_compliance("Treasury Investment", risk_score=9, citizen_reputation=90)
print(f"Result: {test_proposal}")
