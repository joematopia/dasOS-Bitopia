//! Bitopia: E-Watt Dynamic Pricing Engine
//! Logic: Thermodynamic Arbitrage (Solar Exposure, Congestion, & Thermal Limits)

pub struct OrbitalNode {
    pub solar_exposure: f64, // 0.0 (Eclipse) to 1.0 (Direct Sun)
    pub battery_level: f64,  // 0.0 to 100.0%
    pub active_jobs: u32,    // Current AI payloads being processed
    pub thermal_load: f64,   // 0.0 to 100.0% (GPU heat saturation)
}

impl OrbitalNode {
    /// Calculates the current price of 1 E-Watt in $SOV
    pub fn calculate_price(&self) -> Result<f64, &'static str> {
        // HARD STOP: Hardware Protection Protocol
        if self.thermal_load > 95.0 {
            return Err("🚫 NODE LOCKOUT: Critical thermal saturation. Radiators require cooldown.");
        }

        let mut price = 1.0; // Base $SOV price per E-Watt
        
        // 1. Scarcity Multiplier: If in eclipse, price triples to protect battery
        if self.solar_exposure < 0.2 { price *= 3.0; }
        
        // 2. Congestion Multiplier: Price increases as more companies bid
        price *= 1.0 + (self.active_jobs as f64 * 0.1);
        
        // 3. Thermal Premium: As heat rises above 75%, price scales exponentially
        if self.thermal_load > 75.0 {
            let thermal_penalty = (self.thermal_load - 75.0) * 0.2; // +20% price per degree over 75
            price *= 1.0 + thermal_penalty;
            println!("⚠️ THERMAL PREMIUM ACTIVE: Radiator capacity approaching limits.");
        }
        
        Ok(price)
    }
}

fn main() {
    // SCENARIO 1: Prime Condition
    let node_prime = OrbitalNode { solar_exposure: 1.0, battery_level: 98.0, active_jobs: 1, thermal_load: 45.0 };
    
    // SCENARIO 2: Node running too hot
    let node_hot = OrbitalNode { solar_exposure: 1.0, battery_level: 90.0, active_jobs: 4, thermal_load: 85.0 };

    println!("--- MEO Swarm Pricing Telemetry ---");
    match node_prime.calculate_price() {
        Ok(p) => println!("🟢 Node Alpha (Nominal): {:.2} $SOV / E-Watt", p),
        Err(e) => println!("{}", e),
    }

    match node_hot.calculate_price() {
        Ok(p) => println!("🟠 Node Beta (Running Hot): {:.2} $SOV / E-Watt", p),
        Err(e) => println!("{}", e),
    }
}
