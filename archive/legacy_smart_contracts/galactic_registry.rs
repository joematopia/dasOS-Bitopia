//! dasOS-Bitopia: The Galactic Registry
//! Smart Contract: RWA (Real World Asset) Tokenization for Celestial Bodies
//! Language: Rust (Space-Grade Execution)

use std::collections::HashMap;
use std::time::{SystemTime, UNIX_EPOCH};

// --- Core Data Structures ---

#[derive(Debug, Clone)]
pub enum CelestialBody {
    Lunar(String),       // e.g., "Mare Tranquillitatis"
    Asteroid(String),    // e.g., "16-Psyche"
    OrbitalSlot(String), // e.g., "MEO-Sector-7G"
    Martian(String),     // e.g., "Jezero Crater"
}

#[derive(Debug, Clone)]
pub struct SpaceAssetClaim {
    pub claim_id: String,
    pub claimant_zk_id: String, // Privacy-preserved Citizen ID
    pub body: CelestialBody,
    pub coordinates_ra_dec: String, // Right Ascension & Declination
    pub resource_type: String, // e.g., "Helium-3", "Platinum", "Compute Bandwidth"
    pub registration_timestamp: u64,
    pub fee_paid_sov: f64,
}

pub struct GalacticRegistry {
    // Maps a unique celestial coordinate to its immutable claim
    pub claims_ledger: HashMap<String, SpaceAssetClaim>,
    pub registration_fee_sov: f64,
}

// --- Contract Logic ---

impl GalacticRegistry {
    pub fn new() -> Self {
        GalacticRegistry {
            claims_ledger: HashMap::new(),
            registration_fee_sov: 500.0, // Fixed cost to deter spam claims
        }
    }

    /// Registers a new celestial asset on the Blocks L1
    pub fn file_claim(
        &mut self,
        claimant_zk_id: String,
        body: CelestialBody,
        coordinates: String,
        resource: String,
        sov_balance: &mut f64,
    ) -> Result<SpaceAssetClaim, &'static str> {
        
        println!("🛰️ INITIATING REGISTRATION: {} at {}", resource, coordinates);

        // 1. Verify Funds ($SOV Treasury Mechanics)
        if *sov_balance < self.registration_fee_sov {
            return Err("🚫 REGISTRATION FAILED: Insufficient $SOV for Galactic Title Fee.");
        }

        // 2. Prevent Double-Claiming (Immutable Property Rights)
        if self.claims_ledger.contains_key(&coordinates) {
            return Err("🚫 REGISTRATION FAILED: Celestial coordinates already registered.");
        }

        // 3. Execute Transaction
        *sov_balance -= self.registration_fee_sov;
        let timestamp = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs();
        let claim_id = format!("CLAIM-RWA-{}-{}", timestamp, claimant_zk_id[0..6].to_string());

        let new_claim = SpaceAssetClaim {
            claim_id: claim_id.clone(),
            claimant_zk_id,
            body,
            coordinates_ra_dec: coordinates.clone(),
            resource_type: resource,
            registration_timestamp: timestamp,
            fee_paid_sov: self.registration_fee_sov,
        };

        // 4. Lock into the Ledger
        self.claims_ledger.insert(coordinates, new_claim.clone());
        
        println!("✅ TITLE SECURED: {}", claim_id);
        println!("💎 500 $SOV routed to the Bitopia Multisig Endowment.");
        
        Ok(new_claim)
    }

    /// Public Oracle Query: Proves ownership to terrestrial legacy courts
    pub fn verify_ownership(&self, coordinates: &str) -> Option<&SpaceAssetClaim> {
        self.claims_ledger.get(coordinates)
    }
}

// --- Registry Execution Simulator ---
fn main() {
    let mut registry = GalacticRegistry::new();
    let mut corporate_wallet_sov = 5000.00;

    println!("--- Filing Lunar Helium-3 Claim ---");
    match registry.file_claim(
        String::from("zk-ID-AstroCorp-99"),
        CelestialBody::Lunar(String::from("Oceanus Procellarum")),
        String::from("RA: 05h 30m, Dec: +10° 00'"),
        String::from("Helium-3 Deposition"),
        &mut corporate_wallet_sov,
    ) {
        Ok(claim) => println!("Claim Logged: {:?}", claim.claim_id),
        Err(e) => println!("{}", e),
    }

    println!("\n--- Attempting Double-Claim Attack ---");
    match registry.file_claim(
        String::from("zk-ID-Hostile-Actor"),
        CelestialBody::Lunar(String::from("Oceanus Procellarum")),
        String::from("RA: 05h 30m, Dec: +10° 00'"), // Exact same coordinates
        String::from("Helium-3 Deposition"),
        &mut corporate_wallet_sov,
    ) {
        Ok(_) => {},
        Err(e) => println!("{}", e), // This will trigger the immutable defense
    }
    
    println!("\nRemaining Corporate Balance: {} $SOV", corporate_wallet_sov);
}
