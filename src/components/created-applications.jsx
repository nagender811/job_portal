import { getApplications } from "@/api/apiApplications";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import ApplicationCard from "./ui/application-card";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    fn: fnApplications,
    data: applications,
    loading: loadingApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);

  if (loadingApplications) {
    return <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard key={application.id} application={application} isCandidate/>
        );
      })}
    </div>
  );
};

export default CreatedApplications;
