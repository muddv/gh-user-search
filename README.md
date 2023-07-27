# GitHub user panel

Задание:
Необходимо реализовать интерфейс поиска пользователей.
Данные по пользователям берем с https://api.github.com/search/users?q={имя пользователя} (документация https://developer.github.com/v3/search/#search-users)

Требования:
- Поиск: по логину.
- Сортировка: по кол-ву репозиториев (возрастанию/убыванию)
- Использовать React.
- Пагинация.
- При клике на элемент - открываются подробности (как и какие на усмотрение разработчика).
- Реализовать 3 юнит-теста на функционал. 

# TODO
- [ ] trim username before sending req
- [x] move search atom to stores
- [ ] handle different http res codes
- [x] find out if there is a page 0: THERE IS NO PAGE 0
- [ ] display search loader
- [ ] clean up `handleSearch()` function
- [ ] sort the users by repos
- [ ] add page number and perpage options
- [ ] write tests

