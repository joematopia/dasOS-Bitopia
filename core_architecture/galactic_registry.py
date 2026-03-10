import hashlib

class GalacticRegistry:
    def __init__(self, codex):
        self.codex = codex
        self.assets = {}

    def register_space_rwa(self, asset_name, asset_type, coordinates, owner_id, owner_rep):
        """
        Registers an orbital or celestial asset.
        Requires a minimum reputation score (GOV) to prevent resource squatting.
        """
        if owner_rep < 50:
            return "DENIED: Insufficient Reputation ($GOV) to register celestial RWA."

        # Create a unique on-chain ID for the celestial body
        asset_id = hashlib.sha256(f"{coordinates}{asset_name}".encode()).hexdigest()[:12]
        
        self.assets[asset_id] = {
            "name": asset_name,
            "type": asset_type,
            "coords": coordinates,
            "owner": owner_id,
            "status": "Verified"
        }
        return f"SUCCESS: {asset_name} ({asset_type}) registered. Asset ID: BTP-{asset_id}"
