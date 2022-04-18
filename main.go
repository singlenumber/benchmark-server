package main

import (
	"fmt"
	"net/http"
)

func pong(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "pong")
}

func main() {
	http.HandleFunc("/ping", pong)
	http.ListenAndServe(":8000", nil)
}
