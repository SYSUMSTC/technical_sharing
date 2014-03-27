#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

struct data {
	char name[10];
	int class, grade;
	char email[10];
};

int main()
{
	struct data a;
	scanf("%s%d%d%s", a.name, &a.class, &a.grade, a.email);
	int fd = open("data", O_WRONLY | O_CREAT, 0600);
	write(fd, &a, sizeof(struct data));
	return 0;
}
