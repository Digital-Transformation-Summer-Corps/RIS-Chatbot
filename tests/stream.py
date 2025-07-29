def stream():
    for i in range(10):
        yield f"Hello {i}"
    yield "Hello 10"

for i in stream():
    print(i)

