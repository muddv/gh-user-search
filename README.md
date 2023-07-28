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
- [x] sort the users by repos
- [ ] make ui option for desc vs asc
- [ ] add page number and perpage options
- [ ] write tests
- [ ] prevent "Show more" for the last result page
- [ ] convert from "Show more" to pages
- [ ] trim GHUser fields to take less memory
- [ ] There must not be any duplicates in state
- [ ] add loader before users are added
- [ ] CHANGE SORTING WHEN ASC VS DESC IS TOGGLED
- [ ] use native res for avis
- [ ] HANDLE fetch errors
- [ ] display api errors correctly
- [ ] prevent getDetails() req several times for same user
- [ ] handle error response for user details
- [ ] change color of icons
- [ ] correct `Function` type in debounce.ts
- [ ] do i need to a function in GHUser.tsx when setting state?
- [ ] convert SearchRes + SearchErr to an intersection type
- [ ] trim text fields
