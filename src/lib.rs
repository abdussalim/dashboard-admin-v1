use wasm_bindgen::prelude::*;
use web_sys::console;

// Timer struct to handle meditation timing
#[wasm_bindgen]
pub struct Timer {
    start_time: Option<f64>,
    duration: f64,
    is_active: bool,
}

#[wasm_bindgen]
impl Timer {
    #[wasm_bindgen(constructor)]
    pub fn new(duration_seconds: f64) -> Timer {
        Timer {
            start_time: None,
            duration: duration_seconds * 1000.0,
            is_active: false,
        }
    }

    pub fn start(&mut self, current_time: f64) {
        self.start_time = Some(current_time);
        self.is_active = true;
    }

    pub fn pause(&mut self, current_time: f64) {
        if let Some(start) = self.start_time {
            self.duration -= current_time - start;
            self.is_active = false;
        }
    }

    pub fn reset(&mut self, initial_duration: f64) {
        self.duration = initial_duration * 1000.0;
        self.start_time = None;
        self.is_active = false;
    }

    pub fn get_remaining_time(&self, current_time: f64) -> f64 {
        if !self.is_active {
            return self.duration / 1000.0;
        }

        if let Some(start) = self.start_time {
            let elapsed = current_time - start;
            let remaining = (self.duration - elapsed).max(0.0);
            remaining / 1000.0
        } else {
            self.duration / 1000.0
        }
    }

    pub fn is_active(&self) -> bool {
        self.is_active
    }
}

// Breathing cycle handler
#[wasm_bindgen]
pub struct BreathingCycle {
    phase: i32,
    start_time: Option<f64>,
    is_active: bool,
}

#[wasm_bindgen]
impl BreathingCycle {
    #[wasm_bindgen(constructor)]
    pub fn new() -> BreathingCycle {
        BreathingCycle {
            phase: 0,
            start_time: None,
            is_active: false,
        }
    }

    pub fn start(&mut self, current_time: f64) {
        self.start_time = Some(current_time);
        self.is_active = true;
    }

    pub fn stop(&mut self) {
        self.start_time = None;
        self.is_active = false;
        self.phase = 0;
    }

    pub fn get_phase(&self, current_time: f64) -> i32 {
        if !self.is_active {
            return 0;
        }

        if let Some(start) = self.start_time {
            let elapsed = current_time - start;
            let cycle_position = (elapsed / 4000.0) % 3.0;
            cycle_position as i32
        } else {
            0
        }
    }

    pub fn is_active(&self) -> bool {
        self.is_active
    }
}

// Utils for logging
#[wasm_bindgen]
pub fn log(s: &str) {
    console::log_1(&JsValue::from_str(s));
}