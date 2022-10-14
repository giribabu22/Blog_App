# def recursive_fibonacci(n):
#   if n <= 1: 
#       print('run> ',n)
#       return n
#   else:
#       return(recursive_fibonacci(n-1) + recursive_fibonacci(n-2))


 
# n_terms = 10
# for i in range(n_terms):
#     num = recursive_fibonacci(i) # 0  1 2 3
#     print(num)

def res(num):
    if num == 10:
        return num
    print(num)
    res(num+1)
    print(num)

res(1)