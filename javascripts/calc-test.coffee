describe "CalcLogic.add 関数のテスト", ->
  it "1 + 1 は 2", ->
    expect(CalcLogic.add(1, 1)).toBe 2
  it "1 + 3 は 4", ->
    expect(CalcLogic.add(1, 4)).toBe 5
  it "10 + 20 は 30", ->
    expect(CalcLogic.add(10, 20)).toBe 30
  it "1 + 1 は 2", ->
    expect(CalcLogic.add(1, 1)).toBe 2
  it "文字列を与えるとエラー（左）", ->
    try
      CalcLogic.add("Hello", 1)
    catch e
      expect(e).toBe "numbers have to be integer."
  it "文字列を与えるとエラー（右）", ->
    try
      CalcLogic.add(1, "Hello")
    catch e
      expect(e).toBe "numbers have to be integer."
  return
