CREATE OR REPLACE FUNCTION trg_log_department_change() RETURNS trigger AS $$
BEGIN
  IF NEW."departmentId" IS DISTINCT FROM OLD."departmentId" THEN
    INSERT INTO "LogsDepartmentChangeByEmployee" (
      "modificationDate",
      "previousDepartmentId",
      "newDepartmentId",
      "employeeId"
    ) VALUES (
      now(),
      OLD."departmentId",
      NEW."departmentId",
      OLD."id"
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_department_change ON "Employee";
CREATE TRIGGER trg_department_change
AFTER UPDATE ON "Employee"
FOR EACH ROW
EXECUTE FUNCTION trg_log_department_change();


CREATE OR REPLACE FUNCTION trg_log_employee_updates() RETURNS trigger AS $$
BEGIN
  IF NEW."firstName" IS DISTINCT FROM OLD."firstName" THEN
    INSERT INTO "LogsUpdateemployee" VALUES (DEFAULT, OLD."id", now(), 'firstName', OLD."firstName", NEW."firstName");
  END IF;
  IF NEW."lastName" IS DISTINCT FROM OLD."lastName" THEN
    INSERT INTO "LogsUpdateemployee" VALUES (DEFAULT, OLD."id", now(), 'lastName', OLD."lastName", NEW."lastName");
  END IF;
  IF NEW."address" IS DISTINCT FROM OLD."address" THEN
    INSERT INTO "LogsUpdateemployee" VALUES (DEFAULT, OLD."id", now(), 'address', OLD."address", NEW."address");
  END IF;
  IF NEW."email" IS DISTINCT FROM OLD."email" THEN
    INSERT INTO "LogsUpdateemployee" VALUES (DEFAULT, OLD."id", now(), 'email', OLD."email", NEW."email");
  END IF;
  IF NEW."cellPhoneNumber" IS DISTINCT FROM OLD."cellPhoneNumber" THEN
    INSERT INTO "LogsUpdateemployee" VALUES (DEFAULT, OLD."id", now(), 'cellPhoneNumber', OLD."cellPhoneNumber", NEW."cellPhoneNumber");
  END IF;
  IF NEW."position" IS DISTINCT FROM OLD."position" THEN
    INSERT INTO "LogsUpdateemployee" VALUES (DEFAULT, OLD."id", now(), 'position', OLD."position", NEW."position");
  END IF;
  IF NEW."identificationNumber" IS DISTINCT FROM OLD."identificationNumber" THEN
    INSERT INTO "LogsUpdateemployee" VALUES (DEFAULT, OLD."id", now(), 'identificationNumber', OLD."identificationNumber", NEW."identificationNumber");
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_employee_data_change ON "Employee";
CREATE TRIGGER trg_employee_data_change
AFTER UPDATE ON "Employee"
FOR EACH ROW
EXECUTE FUNCTION trg_log_employee_updates();


CREATE OR REPLACE FUNCTION trg_log_department_updates() RETURNS trigger AS $$
BEGIN
  IF NEW."name" IS DISTINCT FROM OLD."name" THEN
    INSERT INTO "LogsUpdateDepartment" VALUES (DEFAULT, OLD."id", now(), 'name', OLD."name", NEW."name");
  END IF;
  IF NEW."description" IS DISTINCT FROM OLD."description" THEN
    INSERT INTO "LogsUpdateDepartment" VALUES (DEFAULT, OLD."id", now(), 'description', OLD."description", NEW."description");
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_department_data_change ON "Department";
CREATE TRIGGER trg_department_data_change
AFTER UPDATE ON "Department"
FOR EACH ROW
EXECUTE FUNCTION trg_log_department_updates();
