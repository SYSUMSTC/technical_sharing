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
	int fd = open("data", O_RDONLY);
	struct data a;
	read(fd, &a, sizeof(struct data));
	printf("%s\n%d\n%d\n%s\n", a.name, a.class, a.grade, a.email);
	return 0;
}
