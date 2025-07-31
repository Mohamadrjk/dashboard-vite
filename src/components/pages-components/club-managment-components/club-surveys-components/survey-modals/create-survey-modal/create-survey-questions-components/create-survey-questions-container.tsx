import { Controller } from "react-hook-form";
import { Divider, Input, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import SurveyQuestionsList from "./survey-questions-list";
import useSurveyQuestions from "@/hooks/club-survey-hooks/useSurveyQuestions";

interface NewSurveyQuestionsContainerProps {
  handleCancel: () => void;
  loading: boolean;
  handleAddLevel: (payload: Question[]) => Promise<void>;
}

interface Question {
  id: string;
  title: string;
  imageUrl: string | null;
}

const NewSurveyQuestionsContainer: React.FC<
  NewSurveyQuestionsContainerProps
> = ({ handleAddLevel, handleCancel, loading }) => {
  // Hooks from custom hook
  const {
    addImageToList,
    deleteImageFromList,
    onAddQuestion,
    onDeleteBenefitItem,
    questions,
    setQuestions,
    control,
    errors,
    handleSubmit,
  } = useSurveyQuestions();

  // Render errors if any
  const renderError = (message?: string) => (
    <span className="text-red-500 text-xs font-Regular">{message}</span>
  );

  return (
    <div className="w-full flex flex-col justify-between h-[600px] p-2">
      <div className="w-full h-full flex flex-col gap-6">
        <h2 className="text-lg font-Medium">تعریف جزئیات</h2>

        <div className="relative w-full flex flex-col gap-4 p-4 bg-Highlighter h-full grow rounded-[6px]">
          {/* Form to Add Question */}
          <form
            onSubmit={handleSubmit(onAddQuestion)}
            className="w-full flex items-center gap-2"
          >
            <Controller
              name="title"
              control={control}
              rules={{ required: "شرح پرسش الزامی است" }}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={loading}
                  dir="rtl"
                  placeholder="شرح پرسش را وارد کنید"
                  className="!font-Medium  placeholder:text-secondary !py-[10px] pr-[6px]"
                />
              )}
            />
            <Button
              htmlType="submit"
              type="primary"
              icon={<PlusOutlined />}
              className="flex items-center justify-center"
            />
          </form>

          {/* Display error message if validation fails */}
          {errors.title && renderError(errors.title.message)}

          <Divider className="!m-0" />

          {/* List of Questions */}
          <SurveyQuestionsList
            questions={questions}
            onDeleteBenefitItem={onDeleteBenefitItem}
            setQuestions={setQuestions}
            addImageToList={addImageToList}
            deleteImageFromList={deleteImageFromList}
          />
        </div>
      </div>

      <div className="w-full flex justify-end gap-4 items-center mt-3">
        {/* Cancel Button */}
        <button onClick={handleCancel} className="text-gray-900 !font-Medium">
          انصراف
        </button>

        {/* Submit Button */}
        <button
          onClick={() => handleAddLevel(questions)}
          className="rounded-[6px] shadow bg-cta text-Highlighter font-Medium px-4 py-2 disabled:bg-gray-300"
          disabled={loading}
        >
          ثبت سطح جدید
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </div>
  );
};

export default NewSurveyQuestionsContainer;
