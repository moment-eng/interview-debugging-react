FROM golang:1.18.1

WORKDIR $GOPATH/github.com/moment-eng/backend-go

COPY . .

RUN go install -v ./...

RUN go build

EXPOSE 3001

ENTRYPOINT ["./backend"]

