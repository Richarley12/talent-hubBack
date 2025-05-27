INSERT INTO"Company" (id, "commercialName", nit, address, description, "cellPhoneNumber", "dateCreation",
                              eliminated, state)
VALUES ('4a35714d-8f9a-41b2-b3a6-249776e2c5ab', 'jean', '1033177930', 'calle 13', '', '3234409350',
        '2025-05-27 02:36:48.481', false, true);

INSERT INTO"Company" (id, "commercialName", nit, address, description, "cellPhoneNumber", "dateCreation",
                              eliminated, state)
VALUES ('46aca770-0b8c-413e-9b4d-6caf16505589', 'empresa 1', '8117663223', 'calle 74b sur #35-241', '', '314783382',
        '2025-05-27 02:47:40.938', false, true);

INSERT INTO"Company" (id, "commercialName", nit, address, description, "cellPhoneNumber", "dateCreation",
                              eliminated, state)
VALUES ('36131cd5-4e1a-4ee3-b403-788de2cd5965', 'templados s.a.s', '1022143668', 'calle 112b#64d-40', '', '3164062004',
        '2025-05-27 02:56:30.723', false, true);



INSERT INTO"AccountUser" (id, email, "resetKey", "creationDate", state, "companyId", "employeeId")
VALUES ('a61291a1-3662-4405-bc00-4a10c5f4d72a', 'empresa2@gmail.com', null, '2025-05-27 02:36:49.290', true,
        '4a35714d-8f9a-41b2-b3a6-249776e2c5ab', null);

INSERT INTO"AccountUser" (id, email, "resetKey", "creationDate", state, "companyId", "employeeId")
VALUES ('66cf79b1-97b5-41ea-b807-346ec4ed6d62', 'prueba@gmail.com', null, '2025-05-27 02:47:41.731', true,
        '46aca770-0b8c-413e-9b4d-6caf16505589', null);


INSERT INTO"AccountUserCredential" ( password, "accountUserId")
VALUES ( 'IDPaXHBuj4YvOFpI0ZwIlA==', 'a61291a1-3662-4405-bc00-4a10c5f4d72a');

INSERT INTO"AccountUserCredential" (password, "accountUserId")
VALUES ( 'IDPaXHBuj4YvOFpI0ZwIlA==', '66cf79b1-97b5-41ea-b807-346ec4ed6d62');


INSERT INTO"Department" ( name, description, "creationDate", eliminated, "companyId")
VALUES ('Departamento de electronica', '', '2025-05-27 02:37:11.453', false, '4a35714d-8f9a-41b2-b3a6-249776e2c5ab');

INSERT INTO"Department" ( name, description, "creationDate", eliminated, "companyId")
VALUES ('Departamento de alimentos', '', '2025-05-27 02:48:27.574', false, '46aca770-0b8c-413e-9b4d-6caf16505589');

INSERT INTO"Department" ( name, description, "creationDate", eliminated, "companyId")
VALUES ('Departamento de ingenierías', '', '2025-05-27 02:53:58.323', false, '46aca770-0b8c-413e-9b4d-6caf16505589');

INSERT INTO"Department" ( name, description, "creationDate", eliminated, "companyId")
VALUES ( 'Recursos humanos ', '', '2025-05-27 02:57:21.840', false, '36131cd5-4e1a-4ee3-b403-788de2cd5965');

INSERT INTO"Department" ( name, description, "creationDate", eliminated, "companyId")
VALUES ( 'Area comercial', '', '2025-05-27 02:58:13.776', false, '36131cd5-4e1a-4ee3-b403-788de2cd5965');


INSERT INTO"Employee" ( "departmentId", "companyId", position, "identificationNumber", email, "firstName",
                               "lastName", address, "cellPhoneNumber", "dateCreation", state, eliminated)
VALUES ( 4, '36131cd5-4e1a-4ee3-b403-788de2cd5965', 'Gerente ', '1022143668', 'ramiro1@gmail.com', 'Ramiro',
        'Oquendo ', 'Carrera 67#113 b-28', '3184401342', '2025-05-27 02:58:35.153', true, false);

INSERT INTO"Employee" ( "departmentId", "companyId", position, "identificationNumber", email, "firstName",
                               "lastName", address, "cellPhoneNumber", "dateCreation", state, eliminated)
VALUES ( 4, '36131cd5-4e1a-4ee3-b403-788de2cd5965', 'Auxiliar ', '1128392646', 'Smog128@gmail.com', 'Sandra',
        'Gutierrez ', 'Calle 24#50a-16', '3238019939', '2025-05-27 03:00:04.892', true, false);

INSERT INTO"Employee" ( "departmentId", "companyId", position, "identificationNumber", email, "firstName",
                               "lastName", address, "cellPhoneNumber", "dateCreation", state, eliminated)
VALUES ( 5, '36131cd5-4e1a-4ee3-b403-788de2cd5965', 'Gerente comercial', '193322341', 'sebastian@gmail.com',
        'Sebastian', 'Cicero', '', '323446653', '2025-05-27 02:59:01.689', false, false);
