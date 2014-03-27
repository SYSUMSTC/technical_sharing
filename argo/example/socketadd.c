#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <signal.h>
#include <unistd.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <netinet/tcp.h>

static int initserver(int port)
{
	// open socket
	int sockfd;
	struct sockaddr_in addr;
	if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
		perror("ERROR opening socket");
		exit(1);
	}
	// init socket structure
	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_addr.s_addr = INADDR_ANY;
	addr.sin_port = htons(port);
	// bind
	if (bind(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
		perror("ERROR on binding");
		exit(1);
	}
	if (listen(sockfd, 10) < 0) {
		perror("ERROR on listening");
		exit(1);
	}
	return sockfd;
}

static void process(int sockfd)
{
	int reuse = 1;
	setsockopt(sockfd, SOL_SOCKET, SO_KEEPALIVE, &reuse, sizeof(int));
	setsockopt(sockfd, IPPROTO_TCP, TCP_NODELAY, &reuse, sizeof(int));
	dup2(sockfd, STDIN_FILENO);
	dup2(sockfd, STDOUT_FILENO);
	setvbuf(stdin, NULL, _IOLBF, 0);
	setvbuf(stdout, NULL, _IOLBF, 0);

	int a, b;
	while (scanf("%d%d", &a, &b) != EOF) {
		printf("%d\n", a + b);
	}
}

static void serve(int sockfd)
{
	int csockfd;
	pid_t pid;
	for (;;) {
		csockfd = accept(sockfd, NULL, NULL);
		if (csockfd < 0) {
			perror("ERROR on accept");
			exit(1);
		}
		if ((pid = fork()) < 0) {
			perror("ERROR on fork");
			exit(1);
		} else if (pid == 0) {
			close(sockfd);
			process(csockfd);
			exit(0);
		} else {
			close(csockfd);
		}
	}
}

int main(int argc, char *argv[])
{
	int sock = initserver(atoi(argv[1]));
	serve(sock);
	return 0;
}
