function checkForCurrentSymbolPress () {
    if (current_symbol == "square") {
        if (pins.digitalReadPin(DigitalPin.P4) == 1) {
            return 1
        }
    } else if (current_symbol == "circle") {
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            return 1
        }
    } else if (current_symbol == "heart") {
        if (pins.digitalReadPin(DigitalPin.P6) == 1) {
            return 1
        }
    } else if (current_symbol == "triangle") {
        if (pins.digitalReadPin(DigitalPin.P5) == 1) {
            return 1
        }
    }
    return 0
}
function open_vault () {
    pins.digitalWritePin(DigitalPin.P8, 1)
    basic.pause(1000)
    pins.digitalWritePin(DigitalPin.P8, 0)
}
function play_shape_game () {
    if (code_sequence.length == 0) {
        open_vault()
        shape_display_strip.showColor(neopixel.colors(NeoPixelColors.Black))
        game_state = "key"
    } else {
        if (checkForCurrentSymbolPress()) {
            for (let index = 0; index < 3; index++) {
                showAllShapes()
                basic.pause(200)
                shape_display_strip.showColor(neopixel.colors(NeoPixelColors.Black))
                basic.pause(200)
            }
            code_sequence.removeAt(code_sequence.indexOf(current_symbol))
            current_symbol = code_sequence._pickRandom()
            lightUpCurrentSymbol()
        }
    }
}
function showAllShapes () {
    circle_display.showColor(neopixel.colors(NeoPixelColors.Yellow))
    heart_display.showColor(neopixel.colors(NeoPixelColors.Red))
    triangle_display.showColor(neopixel.rgb(0, 151, 178))
    square_display.showColor(neopixel.colors(NeoPixelColors.Green))
}
function show_key_success () {
    key_circle_lights.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    for (let index = 0; index < 48; index++) {
        key_circle_lights.rotate(-1)
        key_circle_lights.show()
        basic.pause(50)
    }
    for (let index = 0; index < 3; index++) {
        key_circle_lights.showColor(neopixel.colors(NeoPixelColors.Green))
        basic.pause(200)
        key_circle_lights.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(200)
    }
    key_circle_lights.showColor(neopixel.colors(NeoPixelColors.Black))
}
function start_shape_game () {
    code_sequence = [
    "square",
    "circle",
    "heart",
    "triangle"
    ]
    current_symbol = code_sequence._pickRandom()
    pins.digitalWritePin(DigitalPin.P8, 0)
    lightUpCurrentSymbol()
}
function lightUpCurrentSymbol () {
    shape_display_strip.showColor(neopixel.colors(NeoPixelColors.Black))
    if (current_symbol == "square") {
        square_display.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (current_symbol == "circle") {
        circle_display.showColor(neopixel.colors(NeoPixelColors.Yellow))
    } else if (current_symbol == "heart") {
        heart_display.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (current_symbol == "triangle") {
        triangle_display.showColor(neopixel.rgb(0, 151, 178))
    } else {
        shape_display_strip.showColor(neopixel.colors(NeoPixelColors.Red))
    }
    shape_display_strip.show()
}
let code_sequence: string[] = []
let current_symbol = ""
let game_state = ""
let heart_display: neopixel.Strip = null
let triangle_display: neopixel.Strip = null
let square_display: neopixel.Strip = null
let circle_display: neopixel.Strip = null
let shape_display_strip: neopixel.Strip = null
let key_circle_lights: neopixel.Strip = null
led.enable(false)
key_circle_lights = neopixel.create(DigitalPin.P2, 16, NeoPixelMode.RGB)
shape_display_strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)
circle_display = shape_display_strip.range(1, 5)
square_display = shape_display_strip.range(9, 6)
triangle_display = shape_display_strip.range(18, 3)
heart_display = shape_display_strip.range(25, 4)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
game_state = "key"
basic.forever(function () {
    if (game_state == "key") {
        if (pins.digitalReadPin(DigitalPin.P11) == 0) {
            show_key_success()
            game_state = "shapes"
            start_shape_game()
        }
    } else if (game_state == "shapes") {
        play_shape_game()
    }
})
