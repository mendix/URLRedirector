all: URLRedirector.mpk

URLRedirector.mpk:
	cd src && zip -r ../URLRedirector.mpk *

clean:
	rm -f URLRedirector.mpk
