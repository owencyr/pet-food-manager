--psql -U pfm -d pet-food -f ./seeds/seed.pet-food.sql

BEGIN;

INSERT INTO brands (company)
VALUES
('Royal Canin'),
('Purina Pro Plan'),
('Weruva');

INSERT INTO ingredients (name, description, impact)
VALUES
('cow', 'a cow', 7),
('pig', 'a pig', 6),
('chicken', 'a chicken', 2),
('turkey', 'a turkey', 3),
('cow', 'a cow', 2),
('cow', 'desciption', 7),
('cow', 'deskiptio', 2),
('cow', 'descripto', 2),
('cow', 'desukuripushunnu', 2),
('cow', 'wow', 2);

INSERT INTO foods (variety, kcal, grade, rating, i1, i2, i3, i4, i5, brand)
VALUES
('beef', 130, 'C', 1, 1, 2, 3, 4, 5, 1),
('pork', 110, 'B', 2, 6, 7, 8, 9, 10, 3),
('chicken', 120, 'A', 3, 2, 4, 6, 8, 10, 1),
('turkey', 115, 'A', -4, 1, 3, 5, 7, 9, 2);

INSERT INTO users (user_name, full_name, nickname, password)
VALUES
('guy123', 'Guy-Manuel de Homem-Cristo', 'goldguy', '$2y$12$h64XMRckIcZAUJNDWK2efucmRzG4HnUdBFlphdJSLw15v7MiUDr7y'),
('guy456', 'Garrett Douglas', 'someguy', '$2y$12$h64XMRckIcZAUJNDWK2efucmRzG4HnUdBFlphdJSLw15v7MiUDr7y'),
('guy789', 'Baker Mayfield', 'ourguy', '$2y$12$h64XMRckIcZAUJNDWK2efucmRzG4HnUdBFlphdJSLw15v7MiUDr7y');

INSERT INTO ratings (rating, userId, foodId)
VALUES
(1, 1, 1),
(-1, 2, 1),
(-1, 3, 1),
(1, 3, 1),
(-1, 2, 1),
(1, 1, 2),
(-1, 1, 2),
(1, 1, 2),
(-1, 2, 2),
(-1, 2, 2),
(-1, 3, 2),
(1, 3, 3),
(-1, 1, 3),
(1, 2, 3),
(1, 2, 3),
(-1, 3, 3),
(-1, 1, 4),
(1, 3, 4),
(-1, 3, 4),
(-1, 2, 4),
(1, 1, 4);

COMMIT;
